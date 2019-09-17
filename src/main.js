import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import init from './weather-interface';// https://openweathermap.org/current
init();
import { BusinessSearch } from './yelp-api';

$(document).ready(function(){
  const businessSearch = new BusinessSearch();
  businessSearch.callBuisinessInfo("Seattle", "restaurant");
});