#!/bin/bash
set -euo pipefail

# Downloads and vendors AtomicSDK XCFrameworks from GitHub releases.
#
# Usage: ./scripts/update-ios-sdk.sh [--dynamic] <version>
# Examples:
#   ./scripts/update-ios-sdk.sh 3.27.2              # static (default)
#   ./scripts/update-ios-sdk.sh --dynamic 3.27.2    # dynamic variant
#
# The --dynamic flag swaps the default static xcframeworks for their
# dynamic-framework counterparts (e.g. AtomicTransact-Dynamic.xcframework.tar.gz),
# extracts them under the same on-disk paths the podspec expects (no -Dynamic
# suffix), and stamps `<version>-dynamic` into .sdk-version. Used by the
# release-dynamic workflow to publish opt-in `*-dynamic` releases for clients
# hitting the static-thunk-corruption crash. Wrapper source code is unchanged
# between variants.

DYNAMIC=false
VERSION=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dynamic|-d)
      DYNAMIC=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [--dynamic] <version>"
      exit 0
      ;;
    -*)
      echo "Error: unknown flag '$1'" >&2
      echo "Usage: $0 [--dynamic] <version>" >&2
      exit 1
      ;;
    *)
      if [ -z "$VERSION" ]; then
        VERSION="$1"
      else
        echo "Error: unexpected argument '$1'" >&2
        echo "Usage: $0 [--dynamic] <version>" >&2
        exit 1
      fi
      shift
      ;;
  esac
done

if [ -z "$VERSION" ]; then
  echo "Usage: $0 [--dynamic] <version>" >&2
  exit 1
fi

# Strip leading 'v' if present
VERSION="${VERSION#v}"

if [ "$DYNAMIC" = true ]; then
  TARGET_VERSION="${VERSION}-dynamic"
  FRAMEWORKS=(
    "AtomicTransact-Dynamic.xcframework.tar.gz"
    "MuppetIOS-Dynamic.xcframework.tar.gz"
    "QuantumIOS-Dynamic.xcframework.tar.gz"
  )
else
  TARGET_VERSION="$VERSION"
  FRAMEWORKS=(
    "AtomicTransact.xcframework.tar.gz"
    "MuppetIOS.xcframework.tar.gz"
    "QuantumIOS.xcframework.tar.gz"
  )
fi

REPO="atomicfi/atomic-transact-ios"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
FRAMEWORKS_DIR="${PROJECT_DIR}/ios/frameworks"
PODSPEC="${PROJECT_DIR}/atomicfi-transact-react-native.podspec"
VERSION_FILE="${FRAMEWORKS_DIR}/.sdk-version"

BASE_URL="https://github.com/${REPO}/releases/download/${VERSION}"

echo "Updating iOS SDK to version ${TARGET_VERSION}..."

# Check if already at this version
if [ -f "$VERSION_FILE" ] && [ "$(cat "$VERSION_FILE")" = "$TARGET_VERSION" ]; then
  echo "Already at version ${TARGET_VERSION}. Skipping."
  exit 0
fi

# Create frameworks directory
mkdir -p "$FRAMEWORKS_DIR"

# Clean existing frameworks
echo "Cleaning existing frameworks..."
rm -rf "${FRAMEWORKS_DIR}"/*.xcframework

# Download and extract each framework
for ASSET in "${FRAMEWORKS[@]}"; do
  DOWNLOAD_URL="${BASE_URL}/${ASSET}"
  echo "Downloading ${ASSET}..."

  if ! curl -fSL --retry 3 -o "${FRAMEWORKS_DIR}/${ASSET}" "$DOWNLOAD_URL"; then
    echo "Error: Failed to download ${ASSET} from ${DOWNLOAD_URL}" >&2
    exit 1
  fi

  echo "Extracting ${ASSET}..."
  tar -xzf "${FRAMEWORKS_DIR}/${ASSET}" -C "${FRAMEWORKS_DIR}"

  # Clean up tarball
  rm -f "${FRAMEWORKS_DIR}/${ASSET}"
done

# Move frameworks out of artifacts/ subdirectory if present (release-asset
# packaging is inconsistent — some are tarred with the directory, some without).
if [ -d "${FRAMEWORKS_DIR}/artifacts" ]; then
  mv "${FRAMEWORKS_DIR}"/artifacts/*.xcframework "${FRAMEWORKS_DIR}/"
  rm -rf "${FRAMEWORKS_DIR}/artifacts"
fi

# In dynamic mode, rename *-Dynamic.xcframework -> *.xcframework so the
# podspec's vendored_frameworks paths don't need to change between variants.
if [ "$DYNAMIC" = true ]; then
  for DYN_FW in "${FRAMEWORKS_DIR}"/*-Dynamic.xcframework; do
    [ -d "$DYN_FW" ] || continue
    BASE_NAME="$(basename "$DYN_FW")"
    NEW_NAME="${BASE_NAME%-Dynamic.xcframework}.xcframework"
    rm -rf "${FRAMEWORKS_DIR:?}/${NEW_NAME}"
    mv "$DYN_FW" "${FRAMEWORKS_DIR}/${NEW_NAME}"
  done
fi

# Write version file
echo "$TARGET_VERSION" > "$VERSION_FILE"

echo "iOS SDK updated to version ${TARGET_VERSION} successfully."
