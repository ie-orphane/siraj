interface JoinFormData {
  login: string
  name: string
  email: string
  tel: string
  team: string
  skills: string[]
  about: string
  availability: string
  notes?: string
}

interface Submission {
  id: number;
  login: string;
  name: string;
  avatar: string;
  email: string;
  tel: string;
  team: string;
  skills: string[];
  about: string;
  availability: string;
  notes: string;
  email_sent: boolean;
  email_sent_at: string;
  created_at: string;
}
