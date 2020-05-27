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

        Socket connection = new Socket("188.166.39.138", port);

        InputStream inputStream = connection.getInputStream();
	
	int n = 2;
	boolean b = false;
	String time = "";
        byte[] buffer = new byte[1];
        while (n > 0) {
            int bytesread = inputStream.read(buffer);
            if (bytesread != -1) {
                String timeTemp = new String(buffer);
                time += timeTemp;
            } else {
	    	break;
	    }
        }
	System.out.println(time);
	connection.close();

    }
}
