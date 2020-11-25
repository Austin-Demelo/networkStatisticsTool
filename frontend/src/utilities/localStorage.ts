export function getObjectFromLocalStorage<T>(key: string): T | undefined {
	let result: T | undefined = undefined;
	if(localStorage) {
		try {
			const item: string | null = localStorage.getItem(key);
			if(!!item) {
				result = JSON.parse(item);
			}
		}
		catch(e) {
			//
		}
	}
	return result;
}

export function saveObjectFromLocalStorage<T>(key: string, value: T): void {
	if(localStorage) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

export function removeObjectFromLocalStorage<T>(key: string): void {
	if(localStorage) {
		localStorage.removeItem(key);
	}
}