export interface SystemStatus {
	id: number;
	status: string;
	uptime: string;
}

export interface Project {
	id: string; // UUID
	title: string;
	type: string;
	status: 'ONLINE' | 'ARCHIVED' | 'SYSTEM OPTIMAL' | string;
	description: string;
	technologies: string[]; // JSON Array
	glow_color: 'amber' | 'cyan' | 'none'; // Stored as snake_case in DB usually
	logs: string[]; // JSON Array of strings (for terminal aesthetic)
	action_text: string;
	date_created?: string;
	sort?: number;
}

export interface Experience {
	id: string; // UUID
	company: string;
	role: string;
	period: string;
	description: string;
	technologies: string[]; // JSON Array
	status: 'ACTIVE' | 'ARCHIVED' | string;
	sort?: number;
}

export interface Schema {
	system_status: SystemStatus; // Singleton
	projects: Project[]; // Collection
	experience: Experience[]; // Collection
}
