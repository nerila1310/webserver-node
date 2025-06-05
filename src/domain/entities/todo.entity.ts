export class TodoEntity {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean,
    public completedAt?: Date | null
  ) {}

  get isCompleted(): boolean {
    return !!this.completed;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, title, completed, completedAt } = object;

    if (!id) throw "Id is required";
    if (!title) throw "Title is required";

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw "Invalid date format for completedAt";
      }
    }

    return new TodoEntity(id, title, completed, newCompletedAt);
  }
}
