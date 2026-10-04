package test;

public class BadCodeExample {

    private String username = "admin";
    private String password = "password123";

    public void processData(
            String a,
            String b,
            String c,
            String d,
            String e) {

        if (a != null) {

            if (b != null) {

                if (c != null) {

                    if (d != null) {

                        System.out.println(a);
                    }
                }
            }
        }

        String query =
                "SELECT * FROM users WHERE username = '"
                        + username
                        + "'";

        try {

            Runtime.getRuntime().exec(
                    "cmd /c " + password
            );

        } catch (Exception exception) {

            exception.printStackTrace();
        }

        if (a != null) {
            System.out.println(a);
        }

        if (b != null) {
            System.out.println(b);
        }

        if (c != null) {
            System.out.println(c);
        }

        if (d != null) {
            System.out.println(d);
        }

        if (e != null) {
            System.out.println(e);
        }
    }
}
