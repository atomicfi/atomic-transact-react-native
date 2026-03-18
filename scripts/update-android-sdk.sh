#!/bin/bash
set -euo pipefail

# Updates the Android SDK (Maven) dependency version in build.gradle.
# Usage: ./scripts/update-android-sdk.sh <version>
# Example: ./scripts/update-android-sdk.sh 3.17.0

VERSION="${1:?Usage: $0 <version>}"

# Strip leading 'v' if present
VERSION="${VERSION#v}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BUILD_GRADLE="${PROJECT_DIR}/android/build.gradle"

if [ ! -f "$BUILD_GRADLE" ]; then
  echo "Error: build.gradle not found at ${BUILD_GRADLE}" >&2
  exit 1
fi

CURRENT_VERSION=$(sed -n 's/.*def transact_version = "\([^"]*\)".*/\1/p' "$BUILD_GRADLE")

if [ "$CURRENT_VERSION" = "$VERSION" ]; then
  echo "Already at version ${VERSION}. Skipping."
  exit 0
fi

echo "Updating Android SDK from ${CURRENT_VERSION} to ${VERSION}..."

sed -i '' "s/def transact_version = \"${CURRENT_VERSION}\"/def transact_version = \"${VERSION}\"/" "$BUILD_GRADLE"

# Verify the update
NEW_VERSION=$(sed -n 's/.*def transact_version = "\([^"]*\)".*/\1/p' "$BUILD_GRADLE")
if [ "$NEW_VERSION" != "$VERSION" ]; then
  echo "Error: Version update failed. Expected ${VERSION}, got ${NEW_VERSION}" >&2
  exit 1
fi

echo "Android SDK updated to version ${VERSION} successfully."
