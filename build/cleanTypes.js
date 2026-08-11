import { rmSync } from 'node:fs';

// Remove previous declaration output so stale files do not leak into published types.
rmSync('./types', {
	recursive: true,
	force: true,
});
