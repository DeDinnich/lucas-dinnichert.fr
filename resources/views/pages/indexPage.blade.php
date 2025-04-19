@extends('layouts.indexLayout')

@section('content')
  @include('components.indexHero')
  @include('components.indexAbout')
  @include('components.indexStats')
  @include('components.indexSkills')
  @include('components.indexResume')
  @include('components.indexPortfolio')
  @include('components.indexServices')
  @include('components.indexTestimonials')
  @include('components.indexContact')
@endsection
