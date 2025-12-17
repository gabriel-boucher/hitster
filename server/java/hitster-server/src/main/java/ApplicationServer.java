import context.ApplicationContext;
import interfaces.socket.game.GameRessource;
import interfaces.rest.spotify.SpotifyResource;
import interfaces.socket.room.RoomRessource;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

public class ApplicationServer {
    public static final String HTTP_BASE_URI = "http://127.0.0.1:4000/";
    public static final String SOCKET_IO_HOST = "127.0.0.1";
    public static final int SOCKET_IO_PORT = 3000;
    
    private static HttpServer httpServer;
    private static SocketIOServer socketIOServer;
    private final static ApplicationContext applicationContext = new ApplicationContext();

    public static void startHttpServer() {
        SpotifyResource spotifyResource = applicationContext.getSpotifyResource();

        final ResourceConfig rc = new ResourceConfig()
                .register(spotifyResource);

        httpServer = GrizzlyHttpServerFactory.createHttpServer(URI.create(HTTP_BASE_URI), rc);
        System.out.println("HTTP server started at " + HTTP_BASE_URI);
    }
    
    public static void startWebSocketServer() {
        GameRessource gameRessource = applicationContext.getGameRessource();
        RoomRessource roomRessource = applicationContext.getRoomRessource();

        Configuration config = new Configuration();
        config.setHostname(SOCKET_IO_HOST);
        config.setPort(SOCKET_IO_PORT);

        socketIOServer = new SocketIOServer(config);

        roomRessource.setupEventListeners(socketIOServer);
        gameRessource.setupEventListeners(socketIOServer);

        socketIOServer.start();
        System.out.println("Socket.IO server started at " + SOCKET_IO_HOST + ":" + SOCKET_IO_PORT);
    }
    
    public static void stopHttpServer() {
        httpServer.shutdownNow();
        System.out.println("HTTP server stopped");
    }
    
    public static void stopWebSocketServer() {
        socketIOServer.stop();
        System.out.println("Socket.IO server stopped");
    }
    
    public static void startAllServers() {
        startHttpServer();
        startWebSocketServer();
    }
    
    public static void stopAllServers() {
        stopWebSocketServer();
        stopHttpServer();
    }

    public static void main(String[] args) {
        startAllServers();
        
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutting down servers...");
            stopAllServers();
        }));
        
        try {
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            System.err.println("Main thread interrupted");
            Thread.currentThread().interrupt();
        }
    }
}
