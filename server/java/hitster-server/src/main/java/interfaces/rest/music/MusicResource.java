package interfaces.rest.music;

import interfaces.dto.responseDto.EventResponse;
import interfaces.rest.music.addPlaylist.AddPlaylistHandler;
import interfaces.rest.music.addPlaylist.dto.AddPlaylistRequest;
import interfaces.rest.music.removePlaylist.RemovePlaylistHandler;
import interfaces.rest.music.removePlaylist.dto.RemovePlaylistRequest;
import interfaces.rest.music.searchPlaylists.*;
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
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            @QueryParam("query") String query) {
        System.out.println("Searching playlists with query: " + query + " for roomId: " + roomId + " and playerId: " + playerId);
        SearchPlaylistsRequest searchPlaylistsRequest = new SearchPlaylistsRequest(roomId, playerId, query);

        return searchPlaylistsHandler.handleEvent(searchPlaylistsRequest);
    }

    @POST
    @Path("add-playlist")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse addPlaylist(AddPlaylistRequest addPlaylistRequest) {
        System.out.println("Add playlist for roomId: " + addPlaylistRequest.roomId() + " by playerId: " + addPlaylistRequest.playerId());

        return addPlaylistHandler.handleEvent(addPlaylistRequest);
    }

    @DELETE
    @Path("remove-playlist/{playlistId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removePlaylist(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            @PathParam("playlistId") String playlistId
    ) {
        System.out.println("Remove playlistId: " + playlistId + " for roomId: " + roomId + " by playerId: " + playerId);
        RemovePlaylistRequest removePlaylistRequest = new RemovePlaylistRequest(roomId, playerId, playlistId);

        return removePlaylistHandler.handleEvent(removePlaylistRequest);
    }
}
