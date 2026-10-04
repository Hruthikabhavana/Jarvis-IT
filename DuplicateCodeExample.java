package test;

public class DuplicateCodeExample {

    public int calculateTotal(int a, int b, int c) {

        int result = a + b;
        result = result + c;

        if (result > 100) {
            result = result - 10;
        }

        return result;
    }

    public int calculateAmount(int x, int y, int z) {

        int result = x + y;
        result = result + z;

        if (result > 100) {
            result = result - 10;
        }

        return result;
    }
}
