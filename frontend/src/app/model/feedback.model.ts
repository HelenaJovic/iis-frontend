
export interface FeedbackWorkshopDto {
    id?: number;  
  
    contentGrade: number;
    psychologistGrade: number;
  
    finalGrade: number;
  
    organizationGrade: number;
    priceGrade: number;
  
    recommended: boolean;
  
    comment: string;
    registeredUserId: number;
  
    workshopId: number;
  }
  