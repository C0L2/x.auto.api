import { CreateProgramareDto } from "./dto/create-programare.dto";

export type CreatedAppointmentRes = {
    message: string;
    appointment: CreateProgramareDto
}