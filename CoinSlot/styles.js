
export default {
  container: {
    backgroundColor: 'rgba(255,255,255,.75)',
    height: 80,
    marginHorizontal: 30,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  coinImage: {
    flex: 0,
    height: 60,
    width: 60,
    marginHorizontal: 20,
    resizeMode: 'contain',
    opacity: 1
  },
  arrowImage: {
    flex: 0,
    height: 40,
    width: 70,
    resizeMode: 'contain',
    marginTop: 10,
    opacity: 1
  },
  holeImage: {
    flex: 0,
    height: 60,
    width: 60,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  coinImageFloat: {
    flex: 1,
    height: 60,
    width: 60,
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    top: 0,
    marginHorizontal: 20,
    marginVertical: 10,
    opacity: 0,
    transform: [{ rotation: '0deg' }]
  }
};
