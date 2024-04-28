import { Time } from "@angular/common";

export interface Workshop {
    id: number;
    name: string;
    description: string;
    date: Date;
    startTime: Time; 
    endTime: Time; 
    category: WorkshopCategory;
    online: boolean;
    price: number;
    images: string[];
    psychologistId: number;
    hallId: number;
  }

  export enum WorkshopCategory {
    ANXIETY_MANAGEMENT = 'ANXIETY_MANAGEMENT',
    STRESS_REDUCING_TECHNIQUES = 'STRESS_REDUCING_TECHNIQUES',
    MINDFULNESS_BASED_STRESS_REDUCTION = 'MINDFULNESS_BASED_STRESS_REDUCTION',
    EMOTIONAL_INTELLIGENCE = 'EMOTIONAL_INTELLIGENCE',
    SELF_COMPASSION = 'SELF_COMPASSION',
    COGNITIVE_BEHAVIORAL_THERAPY = 'COGNITIVE_BEHAVIORAL_THERAPY',
    POSITIVE_PSYCHOLOGY = 'POSITIVE_PSYCHOLOGY',
    ASSERTIVENESS_TRAINING = 'ASSERTIVENESS_TRAINING',
    ASSERTIVE_COMMUNICATION = 'ASSERTIVE_COMMUNICATION',
    CONFLICT_RESOLUTION = 'CONFLICT_RESOLUTION',
    ANGER_MANAGEMENT = 'ANGER_MANAGEMENT',
    MENTAL_HEALTH_AWARENESS = 'MENTAL_HEALTH_AWARENESS',
    DEPRESSION_MANAGEMENT = 'DEPRESSION_MANAGEMENT',
    SELF_ESTEEM_BUILDING = 'SELF_ESTEEM_BUILDING',
    COUPLES_THERAPY = 'COUPLES_THERAPY',
    FAMILY_THERAPY = 'FAMILY_THERAPY',
    CHILD_PSYCHOLOGY = 'CHILD_PSYCHOLOGY',
    TRAUMA_RECOVERY = 'TRAUMA_RECOVERY',
    ADDICTION_RECOVERY = 'ADDICTION_RECOVERY',
    GRIEF_COUNSELING = 'GRIEF_COUNSELING',
    LIFE_TRANSITIONS = 'LIFE_TRANSITIONS',
    MIND_BODY_CONNECTION = 'MIND_BODY_CONNECTION',
    SLEEP_MANAGEMENT = 'SLEEP_MANAGEMENT'
  }
  