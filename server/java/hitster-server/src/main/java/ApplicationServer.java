import context.ApplicationContext;
import interfaces.filter.CORSFilter;
import interfaces.socket.connection.ConnectionResource;
import interfaces.socket.game.GameResource;
import interfaces.rest.spotify.SpotifyResource;
import interfaces.socket.room.RoomResource;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

import static environments.Env.*;

public class ApplicationServer {
    private static HttpServer httpServer;
    private static SocketIOServer socketIOServer;
    private final static ApplicationContext applicationContext = new ApplicationContext();

    public static void startHttpServer() {
        SpotifyResource spotifyResource = applicationContext.getSpotifyResource();

        final ResourceConfig rc = new ResourceConfig()
                .register(spotifyResource)
                .register(CORSFilter.class);

        String baseUrl = "http://" + HOST + ":" + HTTP_SERVER_PORT;
        httpServer = GrizzlyHttpServerFactory.createHttpServer(URI.create(baseUrl), rc);
        System.out.println("HTTP server started at " + baseUrl);
    }
    
    public static void startWebSocketServer() {
        ConnectionResource connectionResource = applicationContext.getConnectionResource();
        RoomResource roomResource = applicationContext.getRoomRessource();
        GameResource gameResource = applicationContext.getGameRessource();

        Configuration config = new Configuration();
        config.setHostname(HOST);
        config.setPort(Integer.parseInt(WS_SERVER_PORT));
        config.setOrigin("*");

        socketIOServer = new SocketIOServer(config);

        connectionResource.setupEventListeners(socketIOServer);
        roomResource.setupEventListeners(socketIOServer);
        gameResource.setupEventListeners(socketIOServer);

        socketIOServer.start();
        System.out.println("Socket.IO server started at ws://" + HOST + ":" + WS_SERVER_PORT);
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
