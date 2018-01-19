export class Picture {
    private _id: number;
    private _title: string;
    private _description: string;
    private _filename: string;
    private _createdAt: number;

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	public get filename(): string {
		return this._filename;
	}

	public set filename(value: string) {
		this._filename = value;
	}

	public get createdAt(): number {
		return this._createdAt;
	}

	public set createdAt(value: number) {
		this._createdAt = value;
	}
    
}