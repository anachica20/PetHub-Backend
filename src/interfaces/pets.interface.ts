export interface createNewPet {
  idPet?: number;
  name: string;
  species: string;
  breed: string;
  birthDate?: Date;
  ownerId: number;
}

export type PetGender = "MALE" | "FEMALE" | "UNKNOWN";
export type PetStatus = "ACTIVE" | "DECEASED" | "TRANSFERRED";

export interface UpdatePetDto {
  name?: string;
  gender?: PetGender;
  status?: PetStatus;
}
