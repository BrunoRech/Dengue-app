import React from 'react';
import { DetailsPropsContainer, DetailsText, DetailsTitle } from '../../styles';

const Description = ({ name, value }) => {
  return (
    <DetailsPropsContainer>
      <DetailsTitle>{name}</DetailsTitle>
      <DetailsText>{value}</DetailsText>
    </DetailsPropsContainer>
  );
};

export default Description;
