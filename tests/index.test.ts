import ClassEnum from "../src/index"

test('The count of ClassEnum types', () => {

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


test('Collects only ClassEnum types', () => {

    // given
    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("DOG", "dog")
        public static readonly CAT = new Animal("CAT", "dog")
        public static readonly OTHER = 1;
    }

    // when
    const animals = Animal.values()

    // expected
    expect(animals.length).toBe(2)
});


test('Collects only same types of ClassEnum', () => {

    // given
    class Other extends ClassEnum<Other> {
        public static readonly OTHER = new Other("OTHER", "other")
    }

    class Animal extends ClassEnum<Animal> {
        public static readonly DOG = new Animal("DOG", "dog")
        public static readonly CAT = new Animal("CAT", "dog")
    }

    // when
    const animals = Animal.values()

    // expected
    expect(animals.length).toBe(2)
});
