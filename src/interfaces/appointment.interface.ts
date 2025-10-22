export interface CreateAppointmentDto {
  petId: number;
  ownerId: number;
  veterinarianId: number;
  appointmentDate: Date;
  notes: string;
}

export interface AppointmentResponse {
  idAppointment: number;
  petId: number;
  ownerId: number;
  veterinarianId: number;
  appointmentDate: Date;
  status: string;
  notes?: string;
  creationDate?: Date;
}
