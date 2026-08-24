import com.corundumstudio.socketio.SocketIOServer;
import context.ApplicationContext;
import interfaces.filter.CORSFilter;
import interfaces.filter.auth.AuthFilter;
import interfaces.http.deckMovement.DeckMovementResource;
import interfaces.http.music.MusicResource;
import interfaces.http.player.PlayerResource;
import interfaces.http.playlist.PlaylistResource;
import interfaces.http.room.RoomResource;
import interfaces.socket.SocketIOConnectionServer;
import interfaces.socket.connection.ConnectionResource;
import interfaces.http.game.GameResource;
import com.corundumstudio.socketio.Configuration;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

import static environments.Env.*;

public class ApplicationServer {
    private static HttpServer httpServer;
    private static final SocketIOConnectionServer connectionServer = createConnectionServer();
    private final static ApplicationContext applicationContext = new ApplicationContext(connectionServer);

    private static SocketIOConnectionServer createConnectionServer() {
        Configuration config = new Configuration();
        config.setHostname(HOST);
        config.setPort(Integer.parseInt(WS_SERVER_PORT));
        config.setOrigin("*");

        return new SocketIOConnectionServer(new SocketIOServer(config));
    }

    public static void startHttpServer() {
        RoomResource roomResource = applicationContext.getRoomRessource();
        GameResource gameResource = applicationContext.getGameRessource();
        PlayerResource playerResource = applicationContext.getPlayerResource();
        PlaylistResource playlistResource = applicationContext.getPlaylistResource();
        MusicResource musicResource = applicationContext.getMusicResource();
        DeckMovementResource deckMovementResource = applicationContext.getDeckMovementResource();

        final ResourceConfig rc = new ResourceConfig()
                .register(roomResource)
                .register(gameResource)
                .register(playerResource)
                .register(playlistResource)
                .register(musicResource)
                .register(deckMovementResource)
                .register(AuthFilter.class)
                .register(CORSFilter.class);

        String baseUrl = "http://" + HOST + ":" + HTTP_SERVER_PORT;
        httpServer = GrizzlyHttpServerFactory.createHttpServer(URI.create(baseUrl), rc);
        System.out.println("HTTP server started at " + baseUrl);
    }
    
    public static void startWebSocketServer() {
        ConnectionResource connectionResource = applicationContext.getConnectionResource();

        connectionResource.setupEventListeners(connectionServer.socketIOServer);

        connectionServer.start();
        System.out.println("Socket.IO server started at ws://" + HOST + ":" + WS_SERVER_PORT);
    }
    
    public static void stopHttpServer() {
        httpServer.shutdownNow();
        System.out.println("HTTP server stopped");
    }
    
    public static void stopWebSocketServer() {
        connectionServer.stop();
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

