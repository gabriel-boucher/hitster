package environments;

public class Env {
    public final static String HOST = System.getenv("HOST");
    public final static String CLIENT_PORT = System.getenv("CLIENT_PORT");
    public final static String HTTP_SERVER_PORT = System.getenv("HTTP_SERVER_PORT");
    public final static String WS_SERVER_PORT = System.getenv("WS_SERVER_PORT");

    public final static String SPOTIFY_CLIENT_ID = System.getenv("SPOTIFY_CLIENT_ID");
    public final static String SPOTIFY_CLIENT_SECRET = System.getenv("SPOTIFY_CLIENT_SECRET");
}
