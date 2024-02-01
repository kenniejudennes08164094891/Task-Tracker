export class Tasks {
    constructor(
        public columnType: string,
        public title: string,
        public description: string,
        public dueDate: string | any
    ) { }
}


export interface TaskProfile{
    columnType: string,
    title: string,
    description: string,
    dueDate: string | any
}