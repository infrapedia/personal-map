const mapConfig = {
  accessToken: process.env.MAPBOX_ACCESS_TOKEN,
  style: {
    default: 'mapbox://styles/networkatlas/cjt4y5k77443z1fmfu2pfbcuu',
    dark: 'mapbox://styles/mapbox/dark-v10'
  },
  zoom: 1.75,
  center: [-34.292, 27.57],
  data: {
    sources: []
  }
}

export default mapConfig
