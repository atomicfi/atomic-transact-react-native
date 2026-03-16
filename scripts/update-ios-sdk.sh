#!/bin/bash
set -euo pipefail

# Downloads and vendors AtomicSDK XCFrameworks from GitHub releases.
# Usage: ./scripts/update-ios-sdk.sh <version>
# Example: ./scripts/update-ios-sdk.sh 3.27.2

VERSION="${1:?Usage: $0 <version>}"

# Strip leading 'v' if present
VERSION="${VERSION#v}"

REPO="atomicfi/atomic-transact-ios"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
FRAMEWORKS_DIR="${PROJECT_DIR}/ios/frameworks"
PODSPEC="${PROJECT_DIR}/atomicfi-transact-react-native.podspec"
VERSION_FILE="${FRAMEWORKS_DIR}/.sdk-version"

BASE_URL="https://github.com/${REPO}/releases/download/${VERSION}"

FRAMEWORKS=(
  "AtomicTransact.xcframework.tar.gz"
  "MuppetIOS.xcframework.tar.gz"
  "QuantumIOS.xcframework.tar.gz"
)

echo "Updating iOS SDK to version ${VERSION}..."

# Check if already at this version
if [ -f "$VERSION_FILE" ] && [ "$(cat "$VERSION_FILE")" = "$VERSION" ]; then
  echo "Already at version ${VERSION}. Skipping."
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

# Move frameworks out of artifacts/ subdirectory if present
if [ -d "${FRAMEWORKS_DIR}/artifacts" ]; then
  mv "${FRAMEWORKS_DIR}"/artifacts/*.xcframework "${FRAMEWORKS_DIR}/"
  rm -rf "${FRAMEWORKS_DIR}/artifacts"
fi

# Write version file
echo "$VERSION" > "$VERSION_FILE"

# Update podspec version
echo "Updating podspec..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/^atomic_sdk_version = \".*\"/atomic_sdk_version = \"${VERSION}\"/" "$PODSPEC"
else
  sed -i "s/^atomic_sdk_version = \".*\"/atomic_sdk_version = \"${VERSION}\"/" "$PODSPEC"
fi

echo "iOS SDK updated to version ${VERSION} successfully."
