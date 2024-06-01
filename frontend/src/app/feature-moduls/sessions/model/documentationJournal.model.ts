export interface DocumentationJournal {
  id?: number;
  topicSummary: String;
  emotionalReactions: String;
  plan: String;
  operation: Operation;
  documentationId: number;
  date: Date;
}

export enum Operation {
  INS = 'INS',
  UPD = 'UPD',
  DEL = 'DEL',
}
