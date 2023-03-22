import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from '../../utilities/firebase';
import './AdventureCard.css';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { remainingTimeService } from '../TimeLeft/TimeLeft';

const AdventureCard = ({ location }) => {
  const [remainingTime, setRemainingTime] = useState()

  // Subscribe to remaining time
  remainingTimeService.getRemainingTime().subscribe(t => {
    setRemainingTime(t.value)
  })
  
  const saveLocation = async () => {
    const locationsUpdated = {};
    let locations = await getData('users/user1/adventure/locations');

    if (locations) {
      var index = locations
        .map(function (location) {
          return location['name'];
        })
        .indexOf(location['name']);
        
      // Toast notification if adding location results in remaining time < 0
      const selectedLocation = locations[index]
      console.log(remainingTime)
      if (remainingTime - selectedLocation.suggestedTime <= 0) {
        return toast.error("You don't have enough time for this!");;
      }

      locations[index]['selected'] = true;

      locationsUpdated['users/user1/adventure/locations'] = locations;
      updateDatabase(locationsUpdated);
    }
  };

  const removeLocation = async () => {
    const locationsUpdated = {};
    let locations = await getData('users/user1/adventure/locations');

    if (locations) {
      var index = locations
        .map(function (location) {
          return location['name'];
        })
        .indexOf(location['name']);
      locations[index]['selected'] = false;

      locationsUpdated['users/user1/adventure/locations'] = locations;
      updateDatabase(locationsUpdated);
    }
  };

  return (
    <div className="card-container">
      <div className="button-sidebar">
        {!location['startOrEnd'] && (
          <>
            {location['selected'] ? (
              <Button className="adventure-button-minus" onClick={removeLocation}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            ) : (
              <Button className="adventure-button-plus" onClick={saveLocation}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            )}
          </>
        )}
      </div>
      <Card className="card">
        <Card.Img variant="top" src={location.image} className="card-img" style={{height: '3rem'}}/>
        <Card.Body className="card-body">
          <Card.Title data-testid="adventure-card-title" className="card-title">
            <strong>{location.name}</strong>
          </Card.Title>
          <Card.Text className="card-text">
            {location.suggestedTime ? 'Suggested Time: ' + location.suggestedTime + ' Hr' : 
            location.arrivalTime ? 'Final Destination, Arrive by ' + location.arrivalTime : 
            location.start ? 'Origin': ""}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdventureCard;
