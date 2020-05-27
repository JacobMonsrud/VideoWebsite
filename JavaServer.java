import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class JavaServer {
    public static void main(String[] args) throws Exception {
        String portArg = args[0];
        String startTime = args[1];

        int port;
        if (portArg.length() > 4) {
            String newport = portArg.substring(0, 4);
            port = Integer.parseInt(newport);
        } else {
            port = Integer.parseInt(portArg) + 10000;
        }

        ServerSocket server = new ServerSocket(port);

        Socket connection = server.accept();

        OutputStream outputStream = connection.getOutputStream();

        outputStream.write(startTime.getBytes());

        //connection.close();
        //server.close();
    }
}
