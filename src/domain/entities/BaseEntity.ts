export abstract class BaseEntity<IdType = string> {
    constructor(
        public id: IdType,
        public readonly createAt: Date = new Date(),
    ) {}

    public equals(entity?: BaseEntity<IdType>): boolean {
        if (!entity) return false;
        return this.id === entity.id;
    }
}
