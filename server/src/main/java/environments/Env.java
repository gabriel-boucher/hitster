package environments;

import io.github.cdimascio.dotenv.Dotenv;

public class Env {
    private final static Dotenv dotenv = Dotenv.configure()
            .directory("src/main/java/environments")
            .ignoreIfMissing()
            .load();

    public final static String HOST = dotenv.get("HOST");
    public final static String CLIENT_PORT = dotenv.get("CLIENT_PORT");
    public final static String HTTP_SERVER_PORT = dotenv.get("HTTP_SERVER_PORT");
    public final static String WS_SERVER_PORT = dotenv.get("WS_SERVER_PORT");

    public final static String SPOTIFY_CLIENT_ID = dotenv.get("SPOTIFY_CLIENT_ID");
    public final static String SPOTIFY_CLIENT_SECRET = dotenv.get("SPOTIFY_CLIENT_SECRET");

    public final static String JWT_SECRET = dotenv.get("JWT_SECRET");
}
