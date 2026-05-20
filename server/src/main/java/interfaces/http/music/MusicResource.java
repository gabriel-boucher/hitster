package interfaces.http.music;

import interfaces.dto.responseDto.EventResponse;
import interfaces.http.music.addPlaylist.AddPlaylistHandler;
import interfaces.http.music.addPlaylist.dto.AddPlaylistRequest;
import interfaces.http.music.removePlaylist.RemovePlaylistHandler;
import interfaces.http.music.removePlaylist.dto.RemovePlaylistRequest;
import interfaces.http.music.searchPlaylists.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/api/music/")
public class MusicResource {
    private final SearchPlaylistsHandler searchPlaylistsHandler;
    private final AddPlaylistHandler addPlaylistHandler;
    private final RemovePlaylistHandler removePlaylistHandler;

    public MusicResource(SearchPlaylistsHandler searchPlaylistsHandler, AddPlaylistHandler addPlaylistHandler, RemovePlaylistHandler removePlaylistHandler) {
        this.searchPlaylistsHandler = searchPlaylistsHandler;
        this.addPlaylistHandler = addPlaylistHandler;
        this.removePlaylistHandler = removePlaylistHandler;
    }

    @GET
    @Path("search-playlists")
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse searchPlaylists(
            @HeaderParam("x-game-id") String gameId,
            @HeaderParam("x-player-id") String playerId,
            @QueryParam("query") String query) {
        System.out.println("Searching playlists with query: " + query + " for gameId: " + gameId + " and playerId: " + playerId);
        SearchPlaylistsRequest searchPlaylistsRequest = new SearchPlaylistsRequest(gameId, playerId, query);

        return searchPlaylistsHandler.handleEvent(searchPlaylistsRequest);
    }

    @POST
    @Path("add-playlist")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse addPlaylist(AddPlaylistRequest addPlaylistRequest) {
        System.out.println("Add playlist for gameId: " + addPlaylistRequest.gameId() + " by playerId: " + addPlaylistRequest.playerId());

        return addPlaylistHandler.handleEvent(addPlaylistRequest);
    }

    @DELETE
    @Path("remove-playlist/{playlistId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removePlaylist(
            @HeaderParam("x-game-id") String gameId,
            @HeaderParam("x-player-id") String playerId,
            @PathParam("playlistId") String playlistId
    ) {
        System.out.println("Remove playlistId: " + playlistId + " for gameId: " + gameId + " by playerId: " + playerId);
        RemovePlaylistRequest removePlaylistRequest = new RemovePlaylistRequest(gameId, playerId, playlistId);

        return removePlaylistHandler.handleEvent(removePlaylistRequest);
    }
}
