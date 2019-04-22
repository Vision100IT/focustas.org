import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const MapContainer = styled('div')`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  padding-bottom: 50vh;
`;

const MapFrame = styled('iframe')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  border: 0;
`;

const GoogleMap = ({query}) => (
  <MapContainer>
    <MapFrame allowFullScreen title={`Google map ${query}`} src={query} />
  </MapContainer>
);

GoogleMap.propTypes = {
  query: PropTypes.string.isRequired
};

export default GoogleMap;
