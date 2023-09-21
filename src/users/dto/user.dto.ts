import { Expose } from "class-transformer"

export class UserDto {
    @Expose()
    id: number

    @Expose()
    nickname: string

    @Expose()
    email: string
}