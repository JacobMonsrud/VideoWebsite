import java.io.InputStream;
import java.net.Socket;

public class JavaClient {
    public static void main(String[] args) throws Exception {
        String portArg = args[0];

        int port;
        if (portArg.length() > 4) {
            String newport = portArg.substring(0, 4);
            port = Integer.parseInt(newport);
        } else {
            port = Integer.parseInt(portArg) + 10000;
        }

        Socket connection = new Socket("localhost", port);

        InputStream inputStream = connection.getInputStream();

        byte[] buffer = new byte[1];
        while (true) {
            int bytesread = inputStream.read(buffer);
            if (bytesread != -1) {
                String time = new String(buffer);
                System.out.print(time);
            }
        }

    }
}