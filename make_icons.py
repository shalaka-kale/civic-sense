#!/usr/bin/env python3
# Generates placeholder green circle icons for the PWA
# Replace these with your real logo later

import struct, zlib, os

def make_png(size, color=(46, 204, 113)):
    """Create a simple solid-color square PNG."""
    def chunk(name, data):
        c = struct.pack('>I', len(data)) + name + data
        return c + struct.pack('>I', zlib.crc32(name + data) & 0xffffffff)

    r, g, b = color
    signature = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0))

    raw = b''
    for _ in range(size):
        row = b'\x00'
        for _ in range(size):
            row += bytes([r, g, b])
        raw += row

    idat = chunk(b'IDAT', zlib.compress(raw))
    iend = chunk(b'IEND', b'')
    return signature + ihdr + idat + iend

os.makedirs('icons', exist_ok=True)
for size in [48, 192, 512]:
    with open(f'icons/icon-{size}.png', 'wb') as f:
        f.write(make_png(size))
    print(f'Created icons/icon-{size}.png')

print('Done! Replace these with your real logo when ready.')
