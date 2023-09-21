import { IsNumber, IsString } from "class-validator";

export class CreateTeamDto {
  @IsString()
  team_name: string;
  
  @IsNumber()
  team_points: number;

  @IsNumber()
  user_id: number
}
