import React from 'react';
import './App.css';

import Playlist from "../Playlist/Playlist"
import SearchBar from ".//SearchBar/SearchBar"
import SearchResults from "./SearchResults/SearchResults"
import Spotify from "..uitl/Spotify" //util

class App extends React.Component{
  constructor(props){
    super(props)
  

  this.state={
    SearchResults:[],
    playListName:"New PlayList",
    playListTracks:[]
  };

this.search=this.search.bind(this);
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
this.removeTrackSearch = this.removeTrackSearch.bind(this);
this.doThese = this.doThese.bind(this);

}

search(term){
  Spotify.search(term).then(SearchResults => this.setState({SearchResults:SearchResults}))
}

addTrack(track){
  let tracks=this.state.playListTracks;
  if(tracks.find(savedTrack=>savedTrack.id === track.id)){
    return;
  }
  tracks.push(track);
  this.setState({playListTracks:tracks})
}

removeTrack(track){
  let tracks=this.state.playListTracks;
  let trackSearch = this.state.SearchResults;
  tracks=tracks.filter(currentTrack=>currentTrack.id !== track.id);
  trackSearch.unshift(track);
  this.setState({playListTracks:tracks})
}

removeTrackSearch(track){
  let tracks=this.state.SearchResults;
  tracks=tracks.filter(currentTrack=>currentTrack.id !== track.id);
  this.setState({SearchResults:tracks})
}

doThese(){
  this.addTrack(track);
  this.removeTrackSearch(track)
}

updatePlaylistName(name){
  this.setState({updatePlaylistName:name})
}

savePlaylist(){
  const trackUris = this.state.playListTracks.map(track=>track.uri)
  Spotify.savePlaylist(this.state.playListName,trackUris).then( ()=>{
    this.setState({
      updatePlaylistName: "New Playlist",
      playListTracks:[]
    });
  });
}
}



function App() {
  return (
    <div>
    <h1>
      <a href="http://localhost:3000">Musicophile</a>
    </h1>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-Playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.doThese}/>
        <Playlist playlistTracks = {this.state.playlistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist}/>//playListTracks
      </div>
    </div>
    </div>
  );
}


export default App;
