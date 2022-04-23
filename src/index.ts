export default abstract class ClassEnum<T> {
    public title: string

    protected constructor(title: string) {
        this.title = title
    }

    public static values<T>(): T[] {
        return this.getValues();
    }

    private static getValues() {
        const classEnums = [];
        for (const name of Object.getOwnPropertyNames(this)) {
            if (name === 'prototype') {
                continue;
            }

            const descriptor = Object.getOwnPropertyDescriptor(this, name)
            if (!descriptor || descriptor.value.constructor.name !== this.name) {
                continue;
            }

            classEnums.push(descriptor.value)
        }

        return classEnums;
    }

// @ts-ignore
    public static valueOf(value: string): T {
        if (!value || value === '') {
            console.error(`잘못된 값 입니다. value=${value}`)
            throw new Error(`잘못된 값 입니다. value=${value}`)
        }

        const property = this.values().find((property) => {
            return property.value === value
        })

        if (property === undefined) {
            console.error(`${value}맞는 값을 찾을 수 없습니다.`)
            throw new Error(`${value}맞는 값을 찾을 수 없습니다. ${this.name}`)
        }

        return property
    }

    public equals(o: ClassEnum<T>) {
        return this.value === o.value
    }
}
