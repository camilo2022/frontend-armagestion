import { PatternsTime } from 'src/app/Models/TimePatterns/Timepattern';

export class ConfigurationCampaigns {
  id:number;
  cycle_code:number[];
  user_interactions_min_count:number;
  user_interactions_max_count:number;
  confirmation_block_fija: Boolean;
  confirmation_block_movil: Boolean;
  effectiveness_percentage:DoubleRange;
  payment_agreement_percentage:DoubleRange;
  payment_agreement_true_percentage:DoubleRange;
  type_service_percentage:DoubleRange;
  users_assigned: number[];
  campaign_id:number;
  focus_ids:number[];
  assignment_id: number[];
  date: Date;
  user_id: number[];
  usergetcoodin: number[];
  userCoordinador_id: number[];
  timePatterns: PatternsTime;
  timePatterns_1: number[];
  timePatterns_2: number[];
  timePatterns_3: number[];
  
}
