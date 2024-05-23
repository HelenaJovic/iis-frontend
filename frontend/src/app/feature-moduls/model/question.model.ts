export interface Question {
  id?: number;
  text: string;
  category: questionCategory;
  visible: boolean;
  psychologistId: number;
}

export enum questionCategory {
  Openness = 'Openness',
  Conscientiousness = 'Conscientiousness',
  Extraversion = ' Extraversion',
  Agreeableness = 'Agreeableness',
  Neuroticism = 'Neuroticism',
}
