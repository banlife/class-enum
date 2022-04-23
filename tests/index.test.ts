import ClassEnum from "../src/index"
import {EnumNotFound} from "../src/exception/ClassEnumException";

test("Enum simple reference matching", () => {

    // given
    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("dog")
    }

    // when
    const dog = Animal.DOG

    // expected
    expect(dog).toEqual(Animal.DOG)
});


test("The count of ClassEnum types", () => {

    // given
    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("dog")
        public static readonly CAT = new Animal("cat")
    }

    // when
    const animals = Animal.values()

    // expected
    expect(animals.length).toBe(2)
});


test("The values contains all values", () => {

    // given
    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("dog")
        public static readonly CAT = new Animal("cat")
    }

    // when
    const animals = Animal.values()

    // expected
    expect(animals[0]).toBe(Animal.DOG)
    expect(animals[1]).toBe(Animal.CAT)
});


test("Collects only ClassEnum types", () => {

    // given
    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("dog")
        public static readonly CAT = new Animal("cat")
        public static readonly OTHER = 1;
    }

    // when
    const animals = Animal.values()

    // expected
    expect(animals.length).toBe(2)
});


test("Collects only same types of ClassEnum", () => {

    // given
    class Other extends ClassEnum<Other> {
        public static readonly OTHER = new Other("other")
    }

    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("dog")
        public static readonly CAT = new Animal("cat")
    }

    // when
    const animals = Animal.values()

    // expected
    expect(animals.length).toBe(2)
});


test("The dog-enum can't be cat-enum", () => {

    // given
    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("dog")
        public static readonly CAT = new Animal("cat")
    }

    // when
    const dog = Animal.valueOf("DOG")

    // expected
    expect(dog).not.toEqual(Animal.CAT)
});


test("If the enum is not found, error occurs", () => {

    // given
    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("dog")
        public static readonly CAT = new Animal("cat")
    }

    // when
    const mouse = () => {
        Animal.valueOf("MOUSE")
    }

    // expected
    expect(mouse).toThrow(EnumNotFound)
});
