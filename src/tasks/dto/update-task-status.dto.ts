import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";


export class UpdateTaskStatusDTO {
    @IsEnum(TaskStatus, {
        message: `Must Be ${TaskStatus.OPEN}, ${TaskStatus.IN_PROGRESS} or ${TaskStatus.DONE}`,
    })
    status: TaskStatus;
}