enum GitFileStatus {
  Current = 0,

  IndexNew = 1 << 0,
  IndexModified = 1 << 1,
  IndexDeleted = 1 << 2,
  IndexRenamed = 1 << 3,
  IndexTypeChange = 1 << 4,

  WtNew = 1 << 7,
  WtModified = 1 << 8,
  WtDeleted = 1 << 9,
  WtTypeChange = 1 << 10,
  WtRenamed = 1 << 11,
  WtUnreadable = 1 << 12,

  Ignored = 1 << 14,
  Conflicted = 1 << 15,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace GitFileStatus {
  export function isNew(status: number) {
    return (
      (status & GitFileStatus.IndexNew || status & GitFileStatus.WtNew) !== 0
    );
  }
  export function isModified(status: number) {
    return (
      (status & GitFileStatus.IndexModified ||
        status & GitFileStatus.WtModified) !== 0
    );
  }
  export function isDeleted(status: number) {
    return (
      (status & GitFileStatus.WtDeleted ||
        status & GitFileStatus.IndexDeleted) !== 0
    );
  }
  export function isIndexed(status: number) {
    return (
      (status & GitFileStatus.IndexNew ||
        status & GitFileStatus.IndexModified ||
        status & GitFileStatus.IndexDeleted ||
        status & GitFileStatus.IndexTypeChange) !== 0
    );
  }

  export function isWt(status: number) {
    return (
      (status & GitFileStatus.WtNew ||
        status & GitFileStatus.WtModified ||
        status & GitFileStatus.WtDeleted ||
        status & GitFileStatus.WtTypeChange ||
        status & GitFileStatus.WtRenamed ||
        status & GitFileStatus.WtUnreadable) !== 0
    );
  }

  export function isConflicted(status: number) {
    return (status & GitFileStatus.Conflicted) !== 0;
  }
}

export default GitFileStatus;
