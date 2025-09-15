import { IFooDto } from "#Domain/Dto/IFooDto.js";

export interface IFooService {
  getFoo: () => Promise<IFooDto | null>;
}
