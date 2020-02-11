export interface Message {
  message: string;
}

export interface ServiceNowPayload {
  x_referer: string;
  sysparm_aggregation_size: number;
  sysparm_processor: string;
  '0.sysparm_processor': string;
  '0.sysparm_scope': string;
  '0.sysparm_name'?: string;
  '0.sysparm_lang'?: string;
  '0.sysparm_job_loc'?: string;
  '0.sysparm_toggler': number;
  '0.x_referer': string;
}

export interface Dictionaries {
  [key: string]: DictionaryItem[];
}

export interface DictionaryItem {
  id: string;
  name: string;
}

export interface Vacancy {
  country: string;
  id: string;
  location: string;
  name: string;
}

export interface VacancyDetails {
  description: string;
}
