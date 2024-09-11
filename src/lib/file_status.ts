enum GitFileStatus {
    CURRENT = 0,

    INDEX_NEW = 1 << 0,
    INDEX_MODIFIED = 1 << 1,
    INDEX_DELETED = 1 << 2,
    INDEX_RENAMED = 1 << 3,
    INDEX_TYPECHANGE = 1 << 4,

    WT_NEW = 1 << 7,
    WT_MODIFIED = 1 << 8,
    WT_DELETED = 1 << 9,
    WT_TYPECHANGE = 1 << 10,
    WT_RENAMED = 1 << 11,
    WT_UNREADABLE = 1 << 12,

    IGNORED = 1 << 14,
    CONFLICTED = 1 << 15,
}

export default GitFileStatus;
