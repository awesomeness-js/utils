export default function shouldIgnore(filePath, ignorePatterns) {
    const ignore = ignorePatterns.some(pattern => {
        const normalizedPath = filePath.replace(/\\/g, '/');
        const normalizedPattern = pattern.replace(/\\/g, '/');
        if (normalizedPath === normalizedPattern) return true;
        if (normalizedPattern.endsWith('/*')) {
            const baseDir = normalizedPattern.slice(0, -2);
            return normalizedPath.startsWith(baseDir + '/');
        }
        if (normalizedPattern.endsWith('/')) {
            return normalizedPath === normalizedPattern.slice(0, -1) ||
                   normalizedPath.startsWith(normalizedPattern);
        }
        return false;
    });
    return ignore;
}