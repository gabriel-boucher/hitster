package domain.room;

import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.PlaylistNotFoundException;
import domain.game.GameStatus;
import domain.player.Player;
import domain.player.PlayerBuilder;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.room.exception.PlayerAlreadyInRoomException;
import domain.room.exception.PlaylistAlreadyInRoomException;
import domain.spotify.playlist.Playlist;
import domain.spotify.PlaylistBuilder;
import domain.spotify.playlist.PlaylistId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class RoomTest {
    private final static PlayerId A_PLAYER_ID = new PlayerId(UUID.randomUUID());
    private final static PlaylistId A_PLAYLIST_ID = new PlaylistId("playlist-1");

    @Mock
    private PlayerFactory playerFactory;

    private final RoomBuilder roomBuilder = new RoomBuilder();
    private final PlayerBuilder playerBuilder = new PlayerBuilder();
    private final PlaylistBuilder playlistBuilder = new PlaylistBuilder();

    private Room room;
    private Player player;
    private Playlist playlist;

    @BeforeEach
    public void setUp() {
        room = roomBuilder
                .withPlayerFactory(playerFactory)
                .build();
        player = playerBuilder
                .withPlayerId(A_PLAYER_ID)
                .build();
        playlist = playlistBuilder
                .withId(A_PLAYLIST_ID)
                .build();
    }

    // Join Room tests
    @Test
    public void givenInexistantPlayerIdAndGameNotStarted_whenJoinRoom_thenPlayerJoinsRoom() {
        room = roomBuilder
                .withGameStatus(GameStatus.LOBBY)
                .withPlayers(new ArrayList<>())
                .build();
        willReturn(player).given(playerFactory).create(A_PLAYER_ID, new ArrayList<>());

        room.joinRoom(A_PLAYER_ID);

        assertEquals(1, room.getPlayers().size());
    }

    @Test
    public void givenInexistantPlayerIdAndGameNotStarted_whenJoinRoom_thenVerifyCreatePlayer() {
        room = roomBuilder
                .withGameStatus(GameStatus.LOBBY)
                .withPlayers(new ArrayList<>())
                .build();

        room.joinRoom(A_PLAYER_ID);

        verify(playerFactory).create(A_PLAYER_ID, new ArrayList<>());
    }

    @Test
    public void givenExistantPlayerId_whenJoinRoom_thenThrowPlayerInRoomException() {
        room = roomBuilder
                .withPlayers(new ArrayList<>(List.of(player)))
                .build();

        assertThrows(
                PlayerAlreadyInRoomException.class,
                () -> room.joinRoom(A_PLAYER_ID)
        );
    }

    @Test
    public void givenGameStarted_whenJoinRoom_thenThrowInvalidGameStatusException() {
        room = roomBuilder
                .withGameStatus(GameStatus.PLAYING)
                .withPlayers(new ArrayList<>())
                .build();

        assertThrows(
                InvalidGameStatusException.class,
                () -> room.joinRoom(A_PLAYER_ID)
        );
    }

    // Add Playlist tests
    @Test
    public void givenExistantPlayerIdAndInexistantPlaylist_whenAddPlaylist_thenPlaylistAddedToRoom() {
        room = roomBuilder
                .withPlayers(List.of(player))
                .withPlaylists(new ArrayList<>())
                .build();

        room.addPlaylist(A_PLAYER_ID, playlist);

        assertEquals(1, room.getPlaylists().size());
    }

    @Test
    public void givenInexistantPlayerId_whenAddPlaylist_thenThrowPlayerNotFoundException() {
        room = roomBuilder
                .withPlayers(new ArrayList<>())
                .withPlaylists(new ArrayList<>())
                .build();

        assertThrows(
                PlayerNotFoundException.class,
                () -> room.addPlaylist(A_PLAYER_ID, playlist)
        );
    }

    @Test
    public void givenExistantPlaylist_whenAddPlaylist_thenThrowPlaylistInRoomException() {
        room = roomBuilder
                .withPlayers(List.of(player))
                .withPlaylists(new ArrayList<>(List.of(playlist)))
                .build();

        assertThrows(
                PlaylistAlreadyInRoomException.class,
                () -> room.addPlaylist(A_PLAYER_ID, playlist)
        );
    }

    @Test
    public void givenGameStarted_whenAddPlaylist_thenThrowInvalidGameStatusException() {
        room = roomBuilder
                .withGameStatus(GameStatus.PLAYING)
                .withPlayers(List.of(player))
                .withPlaylists(new ArrayList<>())
                .build();

        assertThrows(
                InvalidGameStatusException.class,
                () -> room.addPlaylist(A_PLAYER_ID, playlist)
        );
    }

    // Remove Playlist tests
    @Test
    public void givenExistantPlayerIdAndPlaylistExist_whenRemovePlaylist_thenPlaylistRemovedFromRoom() {
        room = roomBuilder
                .withGameStatus(GameStatus.LOBBY)
                .withPlayers(List.of(player))
                .withPlaylists(new ArrayList<>(List.of(playlist)))
                .build();

        room.removePlaylist(A_PLAYER_ID, A_PLAYLIST_ID);

        assertEquals(0, room.getPlaylists().size());
    }

    @Test
    public void givenInexistantPlayerId_whenRemovePlaylist_thenThrowPlayerNotFoundException() {
        room = roomBuilder
                .withPlayers(new ArrayList<>())
                .build();

        assertThrows(
                PlayerNotFoundException.class,
                () -> room.removePlaylist(A_PLAYER_ID, A_PLAYLIST_ID)
        );
    }

    @Test
    public void givenInexistantPlaylist_whenRemovePlaylist_thenThrowPlaylistNotFoundException() {
        room = roomBuilder
                .withPlayers(List.of(player))
                .withPlaylists(new ArrayList<>())
                .build();

        assertThrows(
                PlaylistNotFoundException.class,
                () -> room.removePlaylist(A_PLAYER_ID, A_PLAYLIST_ID)
        );
    }

    @Test
    public void givenGameStarted_whenRemovePlaylist_thenThrowInvalidGameStatusException() {
        room = roomBuilder
                .withGameStatus(GameStatus.PLAYING)
                .withPlayers(List.of(player))
                .withPlaylists(new ArrayList<>(List.of(playlist)))
                .build();

        assertThrows(
                InvalidGameStatusException.class,
                () -> room.removePlaylist(A_PLAYER_ID, A_PLAYLIST_ID)
        );
    }
}