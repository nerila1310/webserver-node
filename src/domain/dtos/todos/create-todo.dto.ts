export class CreateTodoDto {
  private constructor(public readonly title: string) {}

  static create(prop: {[key:string]: any}): [string?, CreateTodoDto?]{
    const {title} = prop;

    if(!title) return ["Title property is required", undefined];

    return[undefined, new CreateTodoDto(title)];
  }
}
