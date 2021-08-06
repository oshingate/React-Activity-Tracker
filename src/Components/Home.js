import React, { Component } from 'react';
import ActivityDiv from './ActivityDiv';

import HeroSec from './HeroSec';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          ActivityName: 'Learn React',
          month: {
            name: 'August  ',
            days: 31,
          },
          days: [
            '{isDone: true, noOfDay: 1}',
            '{isDone: false, noOfDay: 2}',
            '{isDone: true, noOfDay: 3}',
            '{isDone: false, noOfDay: 4}',
            '{isDone: false, noOfDay: 5}',
            '{isDone: false, noOfDay: 6}',
            '{isDone: false, noOfDay: 7}',
            '{isDone: false, noOfDay: 8}',
            '{isDone: false, noOfDay: 9}',
            '{isDone: false, noOfDay: 10}',
            '{isDone: false, noOfDay: 11}',
            '{isDone: true, noOfDay: 12}',
            '{isDone: false, noOfDay: 13}',
            '{isDone: false, noOfDay: 14}',
            '{isDone: false, noOfDay: 15}',
            '{isDone: false, noOfDay: 16}',
            '{isDone: false, noOfDay: 17}',
            '{isDone: false, noOfDay: 18}',
            '{isDone: false, noOfDay: 19}',
            '{isDone: false, noOfDay: 20}',
            '{isDone: false, noOfDay: 21}',
            '{isDone: false, noOfDay: 22}',
            '{isDone: false, noOfDay: 23}',
            '{isDone: false, noOfDay: 24}',
            '{isDone: false, noOfDay: 25}',
            '{isDone: false, noOfDay: 26}',
            '{isDone: false, noOfDay: 27}',
            '{isDone: false, noOfDay: 28}',
            '{isDone: false, noOfDay: 29}',
            '{isDone: false, noOfDay: 30}',
            '{isDone: false, noOfDay: 31}',
          ],
        },
      ],
    };
  }

  componentDidMount() {
    let fetchedData = JSON.parse(localStorage.getItem('data'));
    this.setState({ data: fetchedData });
  }

  //removentry
  removentry = (activityIndex) => {
    let updatedData = [...this.state.data];
    updatedData.splice(activityIndex, 1);

    this.setState((prevState) => {
      localStorage.setItem('data', JSON.stringify(updatedData));
      return {
        data: updatedData,
      };
    });
  };

  //updateMainData
  updateMainData = (updatedData) => {
    this.setState((prevState) => {
      localStorage.setItem('data', JSON.stringify(updatedData));
      return { data: updatedData };
    });
  };

  monthFinder = (monthNo) => {
    let months = {
      0: { name: 'January ', days: 31 },
      1: { name: 'February  ', days: 28 },
      2: { name: 'March  ', days: 31 },
      3: { name: 'April  ', days: 30 },
      4: { name: 'May  ', days: 31 },
      5: { name: 'June  ', days: 30 },
      6: { name: 'July  ', days: 31 },
      7: { name: 'August  ', days: 31 },
      8: { name: 'September ', days: 30 },
      9: { name: 'October ', days: 31 },
      10: { name: 'November ', days: 30 },
      11: { name: 'December ', days: 31 },
    };

    return months[monthNo];
  };

  addNewActivity = (event) => {
    let eventName = event.target.input.value;
    let time = new Date();
    let month = this.monthFinder(time.getMonth());

    let arrayOfDays = [];
    for (let i = 0; i < month.days; i++) {
      arrayOfDays[i] = { noOfDay: i + 1, isDone: false };
    }

    let newData = {
      ActivityName: eventName,
      month: month,
      days: arrayOfDays,
    };

    console.log('newly created Data', newData);

    this.setState((prevState) => {
      if (prevState.data) {
        localStorage.setItem(
          'data',
          JSON.stringify(prevState.data.concat(newData))
        );
        return {
          data: prevState.data.concat(newData),
        };
      } else {
        localStorage.setItem('data', JSON.stringify([newData]));
        return {
          data: [newData],
        };
      }
    });

    event.target.input.value = null;
  };
  render() {
    return (
      <>
        <HeroSec addNewActivity={this.addNewActivity} />

        {this.state.data ? (
          this.state.data.length > 0 ? (
            <ActivityDiv
              data={this.state.data}
              updateMainData={this.updateMainData}
              removentry={this.removentry}
            />
          ) : (
            <section className='error-sec'>
              <h2 className='text-center'>No Activity To Display</h2>
            </section>
          )
        ) : (
          ''
        )}
      </>
    );
  }
}

export default Home;
